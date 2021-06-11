import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Api from './api';

enum ServerStatus {
    Online,
    SunfireOffline,
    ServerOffline,
    Loading,
}

function StatusIndicator() {// eslint-disable-line
    const [status, setStatus] = useState(ServerStatus.Loading);
    const [display, setDisplay] = useState(true);

    const setOnline = () => {
        setStatus(ServerStatus.Online);
        setTimeout(() => setDisplay(false), 5000);
    };

    useEffect(() => {
        axios
            .get(Api.sunfireUpUrl())
            .then((res) => {
                res.data ? setOnline() : setStatus(ServerStatus.SunfireOffline);
            })
            .catch(() => {
                setStatus(ServerStatus.ServerOffline);
            });
    }, []);

    return (
        <>
            {status === ServerStatus.Loading && <div className="loading">Checking Server Status</div>}
            {status === ServerStatus.ServerOffline && <div className="offline">Server Offline</div>}
            {status === ServerStatus.SunfireOffline && <div className="offline">Sunfire Connection Offline</div>}
            {status === ServerStatus.Online && display && <div className="online">Sunfire Connection Online</div>}
        </>
    );
}
export default StatusIndicator;
