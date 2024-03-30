import dynamic from 'next/dynamic';

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false, // This line disables server-side rendering
});

export default function Home() {
  return (
    <div>
      <MapComponentWithNoSSR />
    </div>
  );
}