'use client';

import React from 'react';
import { getDictionary } from '@core/i18n';

/** The boundary sits outside WorkspaceProvider, so it reads the saved locale directly. */
function savedDictionary() {
  try {
    const raw = window.localStorage.getItem('iam_ai_profile_v1');
    return getDictionary(raw && JSON.parse(raw)?.locale === 'uz' ? 'uz' : 'en');
  } catch {
    return getDictionary('en');
  }
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || '',
    };
  }

  componentDidCatch(error: Error) {
    console.error('IAM AI ErrorBoundary caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      const d = savedDictionary();
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-canvas text-ink">
          <div className="glass-surface max-w-lg w-full rounded-3xl p-8 space-y-5">
            <h1 className="font-editorial text-3xl tracking-tight">{d.errors.title}</h1>
            <p className="text-sm text-muted leading-relaxed break-words">
              {this.state.message || d.errors.unexpected}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: '' });
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="inline-flex items-center justify-center rounded-none bg-accent px-5 py-2.5 text-sm font-medium text-on-accent hover:bg-accent/90 transition-colors cursor-pointer"
            >
              {d.errors.reload}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
