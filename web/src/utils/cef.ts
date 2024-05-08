export function getParentResourceName() {
  const getResourceName = (window as any).GetParentResourceName;
  return getResourceName ? getResourceName() : "nui-frame-app";
}

export function isBrowser() {
  return !(window as any).invokeNative;
}
