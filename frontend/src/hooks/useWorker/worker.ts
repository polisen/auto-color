import { expose } from 'comlink';
import { bobooboo } from './functions';

const worker = {
  // fileStructureAnalyzer,
  bobooboo,
};

export type WorkerType = typeof worker;

expose(worker);
