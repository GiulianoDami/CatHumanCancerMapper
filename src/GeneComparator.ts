import _ from 'lodash';

class GeneComparator {
  /**
   * Calculates the similarity score between two gene sequences
   * @param gene1 - First gene sequence
   * @param gene2 - Second gene sequence
   * @returns Similarity score between 0 and 1
   */
  static calculateSimilarity(gene1: string, gene2: string): number {
    if (!gene1 || !gene2) return 0;
    
    const normalizedGene1 = gene1.toLowerCase().trim();
    const normalizedGene2 = gene2.toLowerCase().trim();
    
    if (normalizedGene1 === normalizedGene2) return 1;
    
    // Calculate Levenshtein distance
    const distance = this.calculateLevenshteinDistance(normalizedGene1, normalizedGene2);
    const maxLength = Math.max(normalizedGene1.length, normalizedGene2.length);
    
    if (maxLength === 0) return 1;
    
    return 1 - (distance / maxLength);
  }
  
  /**
   * Calculates Levenshtein distance between two strings
   * @param str1 - First string
   * @param str2 - Second string
   * @returns Edit distance between strings
   */
  private static calculateLevenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(0));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i] + 1,     // deletion
          matrix[j - 1][i - 1] + cost // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  /**
   * Compares multiple gene sequences and returns similarity matrix
   * @param genes - Array of gene sequences
   * @returns Matrix of similarity scores
   */
  static compareGenes(genes: string[]): number[][] {
    const length = genes.length;
    const similarityMatrix: number[][] = Array(length).fill(null).map(() => Array(length).fill(0));
    
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (i === j) {
          similarityMatrix[i][j] = 1;
        } else {
          similarityMatrix[i][j] = this.calculateSimilarity(genes[i], genes[j]);
        }
      }
    }
    
    return similarityMatrix;
  }
  
  /**
   * Finds the most similar gene to a reference gene
   * @param referenceGene - Gene to compare against
   * @param candidateGenes - Genes to compare with
   * @returns Object containing the most similar gene and its similarity score
   */
  static findMostSimilar(referenceGene: string, candidateGenes: string[]): { gene: string; similarity: number } | null {
    if (!candidateGenes.length) return null;
    
    let maxSimilarity = -1;
    let mostSimilarGene = '';
    
    for (const gene of candidateGenes) {
      const similarity = this.calculateSimilarity(referenceGene, gene);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarGene = gene;
      }
    }
    
    return {
      gene: mostSimilarGene,
      similarity: maxSimilarity
    };
  }
}

export { GeneComparator };