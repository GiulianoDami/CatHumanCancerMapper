import _ from 'lodash';

export class EnvironmentAnalyzer {
  private environmentalFactors: Record<string, number> = {};
  private riskScores: Record<string, number> = {};

  constructor() {
    this.environmentalFactors = {
      'air_pollution': 0,
      'water_contamination': 0,
      'pesticide_exposure': 0,
      'radiation': 0,
      'chemical_exposures': 0,
      'dietary_factors': 0,
      'lifestyle_factors': 0
    };
  }

  /**
   * Analyzes environmental risk factors for both cats and humans
   * @param catGenomicData - Genomic data from cats
   * @param humanGenomicData - Genomic data from humans
   * @returns Risk assessment report
   */
  analyzeEnvironmentalRisks(
    catGenomicData: Record<string, any>,
    humanGenomicData: Record<string, any>
  ): Record<string, any> {
    // Calculate risk scores based on shared mutations
    const sharedMutations = this.findSharedMutations(catGenomicData, humanGenomicData);
    
    // Update environmental factor scores based on shared mutations
    this.updateRiskScores(sharedMutations);
    
    // Generate comprehensive risk assessment
    return {
      environmentalFactors: this.environmentalFactors,
      riskScores: this.riskScores,
      sharedRiskFactors: this.identifySharedRiskFactors(),
      recommendations: this.generateRecommendations()
    };
  }

  /**
   * Identifies shared mutations between cat and human genomic data
   * @param catData - Cat genomic data
   * @param humanData - Human genomic data
   * @returns List of shared mutations
   */
  private findSharedMutations(
    catData: Record<string, any>,
    humanData: Record<string, any>
  ): string[] {
    const catMutations = new Set(Object.keys(catData.mutations || {}));
    const humanMutations = new Set(Object.keys(humanData.mutations || {}));
    
    return [...catMutations].filter(mutation => humanMutations.has(mutation));
  }

  /**
   * Updates risk scores based on identified shared mutations
   * @param sharedMutations - List of shared mutations
   */
  private updateRiskScores(sharedMutations: string[]): void {
    // Reset scores
    Object.keys(this.riskScores).forEach(key => this.riskScores[key] = 0);
    
    // Map mutations to environmental factors
    const mutationToFactor: Record<string, string> = {
      'BRCA1': 'chemical_exposures',
      'BRCA2': 'chemical_exposures',
      'TP53': 'radiation',
      'MYC': 'dietary_factors',
      'KRAS': 'pesticide_exposure'
    };

    // Increment scores for relevant factors
    sharedMutations.forEach(mutation => {
      const factor = mutationToFactor[mutation];
      if (factor && this.riskScores[factor] !== undefined) {
        this.riskScores[factor] += 1;
      }
    });
  }

  /**
   * Identifies shared environmental risk factors
   * @returns List of shared risk factors
   */
  private identifySharedRiskFactors(): string[] {
    return Object.entries(this.riskScores)
      .filter(([_, score]) => score > 0)
      .map(([factor, _]) => factor);
  }

  /**
   * Generates recommendations based on risk assessment
   * @returns List of recommendations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.riskScores['chemical_exposures'] > 0) {
      recommendations.push('Reduce exposure to chemical pollutants');
    }
    
    if (this.riskScores['pesticide_exposure'] > 0) {
      recommendations.push('Minimize pesticide use in pet environments');
    }
    
    if (this.riskScores['radiation'] > 0) {
      recommendations.push('Limit radiation exposure sources');
    }
    
    if (this.riskScores['dietary_factors'] > 0) {
      recommendations.push('Review pet diet for potential carcinogens');
    }
    
    return recommendations;
  }
}