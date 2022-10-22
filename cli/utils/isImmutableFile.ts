const isImmutableFile = (filename: string) => {
  const isFont = () => /.(woff|woff2|ttf|eot|otf)$/.test(filename);
  const isImage = () => /.(png|jpg|jpeg|gif|svg|ico)$/.test(filename);
  const isScript = () => /.(js)$/.test(filename);
  // NOTE: 중요! remoteEntry는 mutable한 script 이다.
  const isRemoteEntryScript = () => /remoteEntry.js$/.test(filename);
  const isStyleSheet = () => /.(css)$/.test(filename);

  return (
    isFont() ||
    isImage() ||
    (isScript() && !isRemoteEntryScript()) ||
    isStyleSheet()
  );
};

export default isImmutableFile;
