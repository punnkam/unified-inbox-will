export default function Loading() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">Saved Replies</h1>
        <p className="text-subtitle-sm text-tertiary">
          Respond to guests faster and more consistently
        </p>
      </div>

      <div className="border-b border-primary"></div>
      <p>loading...</p>
    </div>
  );
}
