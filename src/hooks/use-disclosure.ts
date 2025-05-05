/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useId, useState, useEffect, useRef } from "react";

// Internal helper to handle callback refs
function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Parameters<T>) => {
    callbackRef.current?.(...args);
  }, []) as T;
}

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  onChange?(isOpen: boolean | undefined): void;
  id?: string;
}

// Internal helper to handle controlled state
function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [internalState, setInternalState] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : internalState;

  useEffect(() => {
    if (isControlled && onChange) {
      onChange(value as T);
    }
  }, [isControlled, onChange, value]);

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalState(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [state, setState] as const;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange,
  } = props;

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpen, setIsOpen] = useControllableState(
    isOpenProp,
    defaultOpen || false,
    onChange
  );

  const reactId = useId();
  const id = idProp || reactId;
  const isControlled = isOpenProp !== undefined;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef?.();
  }, [isControlled, onClosePropCallbackRef, setIsOpen]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef?.();
  }, [isControlled, onOpenPropCallbackRef, setIsOpen]);

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps: (props: any = {}) => ({
      ...props,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: (e: React.MouseEvent) => {
        props.onClick?.(e);
        onOpenChange();
      },
    }),
    getDisclosureProps: (props: any = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
