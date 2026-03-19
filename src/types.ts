import _ from 'lodash';

export interface MutationData {
  gene: string;
  mutationType: string;
  position: number;
  referenceAllele: string;
  variantAllele: string;
  species: 'cat' | 'human';
  frequency?: number;
}

export interface AnalysisResults {
  sharedMutations: MutationData[];
  uniqueToCat: MutationData[];
  uniqueToHuman: MutationData[];
  environmentalRiskFactors: string[];
  treatmentRecommendations: string[];
}