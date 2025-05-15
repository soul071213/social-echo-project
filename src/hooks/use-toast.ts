
import { useState, useCallback } from "react";

export type ToastActionElement = React.ReactElement<unknown>;
export type ToastType = "default" | "success" | "error" | "warning";

export interface ToastProps {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  type?: ToastType;
  duration?: number;
}

type ToastState = {
  toasts: ToastProps[];
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const addToast = (state: ToastState, toast: Omit<ToastProps, "id">) => {
  const id = generateId();
  const newToast = { ...toast, id };
  
  return {
    ...state,
    toasts: [newToast, ...state.toasts].slice(0, TOAST_LIMIT),
  };
};

const updateToast = (state: ToastState, toast: ToastProps) => {
  return {
    ...state,
    toasts: state.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)),
  };
};

const dismissToast = (state: ToastState, toastId: string) => {
  return {
    ...state,
    toasts: state.toasts.map((t) =>
      t.id === toastId ? { ...t, dismissed: true } : t
    ),
  };
};

const removeToast = (state: ToastState, toastId: string) => {
  return {
    ...state,
    toasts: state.toasts.filter((t) => t.id !== toastId),
  };
};

export const useToast = () => {
  const [state, setState] = useState<ToastState>({ toasts: [] });

  const toast = useCallback(
    function toast(props: Omit<ToastProps, "id">) {
      const id = generateId();
      const newToast = { ...props, id };
      
      setState((state) => ({
        ...state,
        toasts: [newToast, ...state.toasts].slice(0, TOAST_LIMIT),
      }));

      setTimeout(() => {
        setState((state) => ({
          ...state,
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, props.duration || 5000);

      return id;
    },
    []
  );

  const update = useCallback((props: ToastProps) => {
    setState((state) => updateToast(state, props));
  }, []);

  const dismiss = useCallback((toastId: string) => {
    setState((state) => dismissToast(state, toastId));
    setTimeout(() => {
      setState((state) => removeToast(state, toastId));
    }, TOAST_REMOVE_DELAY);
  }, []);

  return {
    toast,
    update,
    dismiss,
    toasts: state.toasts,
  };
};

// 간단한 toast 함수 내보내기
export const toast = (props: Omit<ToastProps, "id">) => {
  const toastId = generateId();
  // 이 함수는 클라이언트 사이드에서만 작동합니다.
  if (typeof window !== "undefined") {
    const event = new CustomEvent("toast", {
      detail: {
        ...props,
        id: toastId,
      },
    });
    window.dispatchEvent(event);
  }
  return toastId;
};
