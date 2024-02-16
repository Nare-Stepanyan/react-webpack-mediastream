import React, { FC } from "react";

type TableProps = {
  devices: MediaDeviceInfo[];
};

const Table: FC<TableProps> = ({ devices }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>Kind</th>
          <th>Device ID</th>
        </tr>
      </thead>
      <tbody>
        {devices &&
          devices
            .filter(({ deviceId }) => deviceId !== "default")
            .map(({ deviceId, label, kind }, i) => (
              <tr key={i}>
                <td>{label}</td>
                <td>{kind}</td>
                <td>{deviceId}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
