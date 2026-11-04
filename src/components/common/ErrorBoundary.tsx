import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  Props,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ProductHub Error:", error);
    console.error("Component details:", info.componentStack);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="container section error-boundary">
          <div className="error-boundary-content">
            <h1>Something went wrong!</h1>

            <p>
              We couldn't display this page.
              Please try again.
            </p>

            <button
              type="button"
              className="error-retry-btn"
              onClick={this.handleRetry}
            >
              Try Again
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
