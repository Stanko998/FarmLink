import { useEffect, useState } from "react";

const Record = (props: any) => {
  return (
    <>
      <p>{props.record.name}</p>
    </>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const res = await fetch("http://localhost:5050/users/");
      if (!res.ok) {
        const message = "An error ";
        console.log(message);
        return;
      }
      const records = await res.json();
      setRecords(records);
    }

    getRecords();
    return;
  }, [records.length]);

  function recordList() {
    return records.map((record: any) => {
      return <Record record={record} key={record._id} />;
    });
  }
  return (
    <>
      <h1>Svi filmovi</h1>
      <div>{recordList()}</div>
    </>
  );
}
