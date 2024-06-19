export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">AI settings</h1>
        <p className="text-subtitle-sm text-tertiary">
          Supercharge your operation with AI
        </p>
      </div>
      <div className="border-b border-primary"></div>

      <p>loading...</p>
    </div>
  );
}
