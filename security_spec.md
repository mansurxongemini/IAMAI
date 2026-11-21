# IAM AI Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants
1. **Strict Ownership Isolation**: Every `/users/{userId}` document (containing PII like email) and all nested subcollections (`/roadmaps`, `/tasks`, `/nodeThreads`) are accessible ONLY to the verified authenticated user whose `request.auth.uid == userId`.
2. **Email Verification Gate**: All writes require `request.auth != null && request.auth.token.email_verified == true`.
3. **Immutable Ownership & Creation Timestamps**: `ownerId`/`uid` and `createdAt` can never be mutated after creation. `createdAt` on create and `updatedAt` on update must strictly equal `request.time`.
4. **Action-Based Updates & Terminal State Locking**: Archived roadmaps (`status == 'archived'`) cannot be modified. Updates only permit explicit field subsets via `affectedKeys().hasOnly(...)`.
5. **Blueprint Cache Immutability**: `/blueprintCache/{nodeHash}` allows single-document `get` by verified users (never `list` scraping) and bounded `create` only when `createdBy == request.auth.uid`; updates and deletes are strictly denied to prevent cache poisoning.

## 2. Dirty Dozen Adversarial Payloads (Must Return PERMISSION_DENIED)
1. **Cross-user profile read**: User B attempts `get /users/userA`.
2. **Unverified email write**: Unverified token (`email_verified: false`) writes `/users/userA/tasks/t1`.
3. **Identity spoofing on create**: User A creates `/users/userA/roadmaps/r1` with `ownerId: "userB"`.
4. **Shadow ghost field injection**: User A creates `/users/userA` with extra field `isAdmin: true`.
5. **Path ID poisoning**: User A creates `/users/userA/tasks/bad$id..1500chars`.
6. **Unbounded array DoS**: User A writes `busyWindows` with 25 entries (max 10) or `executionSteps` with 20 entries (max 6).
7. **Timestamp forgery**: User A sends a backdated `createdAt` not matching `request.time`.
8. **Immutable ownerId hijack**: User A updates `/users/userA/roadmaps/r1` trying to change `ownerId`.
9. **Archived roadmap mutation**: User A attempts to update `phases` on a roadmap whose `existing().status == 'archived'`.
10. **Value poisoning on whitelisted key**: User A updates `completed` on a task with string `"yes"` instead of boolean.
11. **Blueprint cache scraping**: User A attempts `list /blueprintCache`.
12. **Blueprint cache overwrite poisoning**: User A attempts `update` or `delete` on `/blueprintCache/{nodeHash}`.
