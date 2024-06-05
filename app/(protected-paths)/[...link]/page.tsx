// Catchall page to allow clicking the main sidebar

export default function catchall({ params }: { params: { link: string } }) {
  return (
    <div>
      <h1>{params.link}</h1>
    </div>
  );
}
