type Props = {
  children: React.ReactNode;
};

function EventLayout({ children }: Props) {
  return (
    <main>
      <div className="w-full">{children}</div>
    </main>
  );
}

export default EventLayout;
