import { wrap, releaseProxy } from 'comlink';
import { useEffect, useState, useMemo } from 'react';

function makeWorkerApiAndCleanup() {
  const worker = new Worker('./worker', {
    name: 'worker',
    type: 'module',
  });
  const workerApi = wrap<import('./worker').WorkerType>(worker);

  const cleanup = () => {
    workerApi[releaseProxy]();
    worker.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
}

function useWorker() {
  const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup(), []);

  useEffect(() => {
    const { cleanup } = workerApiAndCleanup;
    return () => {
      cleanup();
    };
  }, [workerApiAndCleanup]);

  return workerApiAndCleanup;
}

function useImplementation(
) {
  const [data, setData] = useState({});

  const { workerApi } = useWorker();

  useEffect(() => {
    workerApi
      .bobooboo('hohooo')
      .then((results: string) => {
        console.debug('workerResults', results);
      });
  }, [workerApi, setData]);

  return data;
}

export default useImplementation;
