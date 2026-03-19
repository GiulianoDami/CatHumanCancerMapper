import _ from 'lodash';

export class TreatmentEngine {
  private sharedMutations: Record<string, string[]> = {};
  
  constructor() {
    // Initialize with known shared mutations
    this.sharedMutations = {
      'BRCA1': ['c.181T>G', 'c.5266dupC'],
      'BRCA2': ['c.7007G>A', 'c.4930_4932delAGA'],
      'TP53': ['c.1193G>A', 'c.1750_1751delAA'],
      'EGFR': ['c.2369_2370delCC', 'c.2369_2370insC'],
      'KRAS': ['c.34G>A', 'c.35G>A']
    };
  }
  
  /**
   * Analyze shared mutations and generate treatment recommendations
   * @param catMutations - Array of mutations found in cats
   * @param humanMutations - Array of mutations found in humans
   * @returns Treatment recommendations based on shared mutations
   */
  public generateRecommendations(
    catMutations: string[], 
    humanMutations: string[]
  ): Record<string, string[]> {
    const recommendations: Record<string, string[]> = {};
    
    // Find shared mutations between cat and human datasets
    const sharedMutations = _.intersection(catMutations, humanMutations);
    
    // For each shared mutation, find corresponding treatment recommendations
    for (const mutation of sharedMutations) {
      const gene = this.getGeneFromMutation(mutation);
      
      if (gene && this.sharedMutations[gene]) {
        // Add treatment recommendations for this gene
        recommendations[gene] = this.sharedMutations[gene];
      }
    }
    
    return recommendations;
  }
  
  /**
   * Get gene name from mutation string
   * @param mutation - Mutation string (e.g., 'BRCA1:c.181T>G')
   * @returns Gene name or undefined if not found
   */
  private getGeneFromMutation(mutation: string): string | undefined {
    // Simple implementation - in a real app this would be more sophisticated
    const parts = mutation.split(':');
    if (parts.length > 0) {
      return parts[0];
    }
    return undefined;
  }
  
  /**
   * Add new shared mutation to the database
   * @param gene - Gene name
   * @param mutation - Mutation identifier
   */
  public addSharedMutation(gene: string, mutation: string): void {
    if (!this.sharedMutations[gene]) {
      this.sharedMutations[gene] = [];
    }
    
    if (!this.sharedMutations[gene].includes(mutation)) {
      this.sharedMutations[gene].push(mutation);
    }
  }
  
  /**
   * Get all available shared mutations
   * @returns All shared mutations by gene
   */
  public getAllSharedMutations(): Record<string, string[]> {
    return { ...this.sharedMutations };
  }
}