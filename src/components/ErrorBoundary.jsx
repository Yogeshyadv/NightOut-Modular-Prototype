import React from 'react';
import { Button, Icon } from './ui/index.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-danger/10 text-danger rounded-3xl flex items-center justify-center mb-6">
            <Icon name="alert" size={40} />
          </div>
          <h2 className="text-2xl font-black mb-4 dark:text-white text-dark-900">Something went wrong</h2>
          <p className="max-w-md dark:text-dark-100 text-dark-500 mb-8 leading-relaxed">
            We've encountered an unexpected error. Don't worry, your data is safe. Please try refreshing the page.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost-dark" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button onClick={() => window.location.href = '/'}>
              Go to Homepage
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-4 dark:bg-dark-800 bg-light-100 rounded-xl text-left overflow-auto max-w-2xl border dark:border-dark-400 border-light-200">
              <div className="text-xs font-mono dark:text-danger text-danger mb-2 font-bold uppercase tracking-widest">Debug Info</div>
              <pre className="text-[10px] font-mono opacity-60 leading-tight">
                {this.state.error?.toString()}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
