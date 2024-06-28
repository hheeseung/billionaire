interface Params {
  params: {
    id: string;
  };
}

export default function Billionaire({ params: { id } }: Params) {
  return <div>{id}</div>;
}
