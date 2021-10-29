/* eslint-disable no-param-reassign */
import stat from './statFunctions';
import silhouette from './silhouette';

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

const summer = (p: number, c: number) => p + c;

function modulo(x: number, y: number) {
  let xPrime = x;
  while (xPrime < 0) {
    xPrime += y; // ASSUMES y > 0
  }
  return xPrime % y;
}

/**
 *
 * @param dataset - colors
 * @param K - number of centroids to get.
 * @returns the positions of the initial centroids.
 */

const getInitalCentroids = (dataset: number[], K: number): number[] => {
  const arr = [];
  while (arr.length < K) {
    const r = dataset[randomBetween(0, dataset.length)];
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

/**
 *
 * @param clusters - the current configuration of clusters.
 * @param centroids -
 * @returns
 */

function getNewCentroids(clusters: number[][], centroids: number[]) {
  return centroids.map((c, i) => {
    if (clusters[i]) {
      const sum = Math.floor(clusters[i].reduce(summer));
      const n = clusters[i].length;

      return Math.floor(sum / n);
    } return c;
  });
}

/**
 * Checks if arrays are the same.
 * @param arr1 - array
 * @param arr2 - array
 * @returns boolean
 */

function checkMatrixSameness(arr1: number[], arr2: number[]) {
  let condition = true;
  arr1.every((c, i) => {
    if (arr2[i] !== c) {
      condition = false;
      return condition;
    }
    return condition;
  });
  return condition;
}

interface KMeansInterface {
  dataset: number[];
  centroids: number[];
  oldCentroids?: number[];
  iterations?: number;
  MAX_ITERATIONS?: number;
}

function KMeansRecurse({
  dataset,
  centroids,
  oldCentroids = [],
  iterations = 1,
  MAX_ITERATIONS = 50,
}: KMeansInterface): number[][] {
  const clusters: number[][] = [];
  dataset.forEach((h) => {
    const centroidIndex = centroids
      .map((c, i) => {
        const distance = Math.abs(modulo(c, 360) - modulo(h, 360));
        return [distance, i];
      })
      .sort((a: any, b: any) => a[0] - b[0])[0][1];
    if (!clusters[centroidIndex]) clusters[centroidIndex] = [];
    clusters[centroidIndex].push(h);
  });
  oldCentroids = centroids;
  centroids = getNewCentroids(clusters, centroids);
  if (iterations >= MAX_ITERATIONS || checkMatrixSameness(centroids, oldCentroids)) {
    return clusters;
  }

  return KMeansRecurse({
    dataset,
    centroids,
    oldCentroids,
    iterations: iterations + 1,
  });
}

function determineOptimalK(results: any) {
  return results
    .map(({ clusters, ...rest }:
    { clusters: number[]; rest: any }) => ({ clusters, ...rest, silhouette: silhouette(clusters) }))
    .filter((f: any) => f.silhouette)
    .sort((a: any, b: any) => b.silhouette - a.silhouette)[0];
}
function getVariance(clusters: number[][]): any {
  return clusters.map((c) => stat.variance(c)).reduce((acc, c) => acc + c);
}

const KMeans = (dataset: number[]): number[] => {
  const results = new Array(dataset.length - 1)
    .fill(0)
    .map((n, K) => {
      const centroids = getInitalCentroids(dataset, K + 1);
      const clusters = KMeansRecurse({ dataset, centroids });
      const variance = getVariance(clusters);
      return { variance, centroids, clusters };
    })
    .sort((a, b) => a.variance - b.variance);
  return determineOptimalK(results).centroids;
};

export default KMeans;
