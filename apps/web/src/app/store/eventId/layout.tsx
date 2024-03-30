type Props = {
  children: React.ReactNode;
};

function EventIdLayout({ children }: Props) {
  return (
    <main>
      <div className="w-full">{children}</div>
    </main>
  );
}

export default EventIdLayout;
