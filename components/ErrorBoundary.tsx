'use client';

import React from 'react';

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
      message: error.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error) {
    console.error('IAM AI ErrorBoundary caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#F4F1EC] text-[#1C1C1A]">
          <div className="glass-surface max-w-lg w-full rounded-3xl p-8 space-y-5">
            <h1 className="font-editorial text-3xl tracking-tight">Workspace Interrupted</h1>
            <p className="text-sm text-[#6A6760] leading-relaxed break-words">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: '' });
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#1C1C1A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#32322F] transition-colors cursor-pointer"
            >
              Reload Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
