import React, { Component } from "react";
import { NativeSyntheticEvent, NativeMethods } from "react-native";

class EmptyComponent
  extends Component<unknown, object, any>
  implements NativeMethods
{
  blur() {}
  focus() {}
  measure(
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ) {
    callback(0, 0, 0, 0, 0, 0);
  }
  measureInWindow(
    callback: (x: number, y: number, width: number, height: number) => void
  ) {
    callback(0, 0, 0, 0);
  }
  measureLayout(
    _relativeToNativeNode: number | React.ElementRef<any>,
    onSuccess: (x: number, y: number, width: number, height: number) => void,
    _onFail: () => void
  ) {
    onSuccess(0, 0, 0, 0);
  }
  setNativeProps(_nativeProps: object) {}

  // Define refs as required by the NativeMethods interface
  refs: {
    [key: string]: Component<any, any>;
  } = {};
}

const emptyEvent: NativeSyntheticEvent<object> = {
  currentTarget: new EmptyComponent({}),
  target: new EmptyComponent({}),
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  preventDefault(): void {
    console.log("preventDefault not implemented for web.");
  },
  isDefaultPrevented(): boolean {
    console.log("isDefaultPrevented not implemented for web.");
    return false;
  },
  stopPropagation(): void {
    console.log("stopPropagation not implemented for web.");
  },
  isPropagationStopped(): boolean {
    console.log("isPropagationStopped not implemented for web.");
    return false;
  },
  persist(): void {
    console.log("persist not implemented for web.");
  },
  timeStamp: 0,
  type: "",
  nativeEvent: {},
};

export default emptyEvent;
