import _ from 'lodash';

export class CancerMapper {
  private catGenes: Set<string>;
  private humanGenes: Set<string>;
  private sharedMutations: Set<string>;

  constructor() {
    this.catGenes = new Set<string>();
    this.humanGenes = new Set<string>();
    this.sharedMutations = new Set<string>();
  }

  /**
   * Adds a gene to the cat genome dataset
   */
  addCatGene(gene: string): void {
    this.catGenes.add(gene);
  }

  /**
   * Adds a gene to the human genome dataset
   */
  addHumanGene(gene: string): void {
    this.humanGenes.add(gene);
  }

  /**
   * Analyzes the genetic datasets to find shared mutations
   */
  analyzeSharedMutations(): void {
    this.sharedMutations = new Set(
      _.intersection(
        Array.from(this.catGenes),
        Array.from(this.humanGenes)
      )
    );
  }

  /**
   * Gets the list of shared mutations between cat and human genomes
   */
  getSharedMutations(): string[] {
    return Array.from(this.sharedMutations);
  }

  /**
   * Checks if a specific gene is present in both species
   */
  isSharedGene(gene: string): boolean {
    return this.catGenes.has(gene) && this.humanGenes.has(gene);
  }

  /**
   * Gets the similarity ratio between cat and human genomes
   */
  getSimilarityRatio(): number {
    const totalGenes = new Set([...this.catGenes, ...this.humanGenes]).size;
    const sharedCount = this.sharedMutations.size;
    
    return totalGenes > 0 ? sharedCount / totalGenes : 0;
  }
}