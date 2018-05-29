import React from 'react';

import styles from './Papers.postcss';
import Publications from '../../containers/Publications/Publications';

const rhabditidaePapers = [
  {
    title:
      'Comparative studies on the phylogeny and systematics of Rhabditidae (Nematoda)',
    authors: ['Walter Sudhaus', 'D. Fitch',],
    date: 2001,
    citation:
      'Sudhaus, W., and Fitch, D., 2001.  Comparative studies on the phylogeny and systematics of Rhabditidae (Nematoda).',
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Evolution of "Rhabditidae" and the male tail.',
    authors: ['D. Fitch',],
    citation:
      'Fitch, D. H. A., 2000.  Evolution of "Rhabditidae" and the male tail.  J. Nematol. 32(3):235-244.',
    date: 2000,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Evolution of male tail development in rhabditid nematodes related to Caenorhabditis elegans',
    authors: ['D. Fitch',],
    citation:
      'Fitch, D. H. A., 1997.  Evolution of male tail development in rhabditid nematodes related to Caenorhabditis elegans.  Syst. Biol. 46(1):145-179.',
    date: 1997,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Evolution',
    authors: ['D. Fitch', 'W.K. Thomas',],
    citation:
      'Fitch, D. H. A., and Thomas, W. K, 1997.  Evolution.  Pages 815-850 in (D. Riddle, T. Blumenthal, B. Meyer and J. Priess, eds.) C. elegans II.  Cold Spring Harbor Laboratory Press, Cold Spring Harbor, NY.',
    date: 1997,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      '18S ribosomal RNA gene phylogeny for some Rhabditidae related to Caenorhabditis',
    authors: ['D. Fitch', 'B. Bugaj-Gaweda',],
    citation:
      'Fitch, D. H. A., Bugaj-Gaweda, B., and Emmons, S. W, 1995.  18S ribosomal RNA gene phylogeny for some Rhabditidae related to Caenorhabditis.  Mol. Biol. Evol. 12(2):346-358.',
    date: 1995,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Caenorhabditis vulgaris (Nematoda: Rhabditidae):  a necromenic associate of pill bugs and snails.',
    authors: ['S.E. Baird', 'D. Fitch',],
    citation:
      'Baird, S. E., Fitch, D. H. A., and Emmons, S. W., 1994.  Caenorhabditis vulgaris (Nematoda: Rhabditidae): a necromenic associate of pill bugs and snails.  Nematologica 40:1-11.',
    date: 1994,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
];

const maleTailMorphogenesis = [
  {
    title: 'Morphogenesis of the C. elegans male tail tip.',
    authors: ['C.Q. Nguyen', 'D. H. Hall', 'Y. Yang', 'D. Fitch',],
    citation:
      'Nguyen, C. Q., Hall, D. H., Yang, Y., and Fitch, D. H. A., 1999.  Morphogenesis of the C. elegans male tail tip.  Dev. Biol. 207(1):86-106.',
    date: 1999,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Evolution of male tail development in rhabditid nematodes related to Caenorhabditis elegans.',
    authors: ['D.H.A. Fitch',],
    citation:
      'Fitch, D. H. A., 1997.  Evolution of male tail development in rhabditid nematodes related to Caenorhabditis elegans.  Syst. Biol. 46(1):145-179.',
    date: 1997,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Variable cell positions and cell contacts underlie morphological evolution of the rays in the male tails of nematodes related to Caenorhabditis elegans.',
    authors: ['D.H.A. Fitch', 'S.W. Emmons',],
    citation:
      'Fitch, D. H. A., 1995.  Evolution of male tail development in rhabditid nematodes related to Caenorhabditis elegans.  Syst. Biol. 46(1):145-179.',
    date: 1997,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Pattern formation in the nematode epidermis:  determination of the arrangement of peripheral sense organs in the C. elegans male tail.',
    authors: ['S.E. Baird', 'D.H.A. Fitch', 'I. Kassem', 'S.W. Emmons',],
    citation:
      'Baird, S. E., Fitch, D. H. A., Kassem, I., and Emmons, S. W., 1991.  Pattern formation in the nematode epidermis:  determination of the arrangement of peripheral sense organs in the C. elegans male tail.  Development 113(2), 515-526.',
    date: 1991,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
];

const molecularEvolution = [
  {
    title:
      'Widespread occurrence of the Tc1 transposon family:  Tc1-like transposons from teleost fish.',
    authors: [
      'A.R. Radice',
      'B. Bugaj',
      'I. Kassem',
      'D.H.A. Fitch',
      'S.W. Emmons',
    ],
    citation:
      'Radice, A. R., Bugaj, B., Fitch, D. H. A., and Emmons, S. W., 1994.  Widespread occurrence of the Tc1 transposon family:  Tc1-like transposons from teleost fish.  Mol. Gen. Genet. 244(6):606-612.',
    date: 1994,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Low codon bias and high rates of synonymous substitution in Drosophila hydei and D. melanogaster histone genes.',
    authors: ['D.H.A. Fitch', ' L.D. Strausbaugh',],
    citation:
      'Fitch, D. H. A., and Strausbaugh, L. D., 1993.  Low codon bias and high rates of synonymous substitution in Drosophila hydei and D. melanogaster histone genes.  Mol. Biol. Evol. 10(2):397-413.',
    date: 1993,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Fetal recruitment of anthropoid γ-globin genes:  findings from phylogenetic analyses involving the 5′-flanking sequences of the Ψγ 1 globin gene of spider monkey Ateles geoffroyi.',
    authors: ['K. Hayasaka', 'D.H.A. Fitch', 'J.L. Slightom', 'M. Goodman',],
    citation:
      'Hayasaka, K., Fitch, D. H. A., Slightom, J. L., and Goodman, M., 1992.  Fetal recruitment of anthropoid γ-globin genes:  findings from phylogenetic analyses involving the 5′-flanking sequences of the Ψγ1 globin gene of spider monkey Ateles geoffroyi.  J. Mol. Biol. 224(3):875-881.',
    date: 1992,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Duplication of the γ-globin gene mediated by repetitive L1 LINE sequences in an early ancestor of simian primates.',
    authors: [
      'D.H.A. Fitch',
      'W.J. Bailey',
      'D.A. Tagle',
      'M. Goodman',
      'L.C. Sieu',
      'J.L. Slightom',
    ],
    citation:
      'Fitch, D. H. A., Bailey, W. J., Tagle, D. A., Goodman, M., Sieu, L. C., and Slightom, J. L., 1991.  Duplication of the γ-globin gene mediated by repetitive L1 LINE sequences in an early ancestor of simian primates.  Proc. Natl. Acad. Sci. USA 88(16):7396-7400.',
    date: 1991,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Phylogenetic scanning:  a computer-assisted algorithm for mapping gene conversions and other recombinational events.',
    authors: ['D.H.A. Fitch', 'M. Goodman',],
    citation:
      'Fitch, D. H. A., and Goodman, M., 1991.  Phylogenetic scanning:  a computer-assisted algorithm for mapping gene conversions and other recombinational events.  CABIOS (Comput. Appl. Biosci.) 7(2):207-215.',
    date: 1991,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Molecular evolution of the Ψη-globin gene locus:  gibbon phylogeny and the Hominoid slowdown.',
    authors: [
      'W.J. Bailey',
      'D.H.A. Fitch',
      'D.A. Tagle',
      'J. Czelusniak',
      'J.L. Slightom',
      'M. Goodman',
    ],
    citation:
      'Bailey, W. J., Fitch, D. H. A., Tagle, D. A., Czelusniak, J., Slightom, J. L., and Goodman, M., 1991.  Molecular evolution of the Ψη-globin gene locus:  gibbon phylogeny and the Hominoid slowdown.  Mol. Biol. Evol. 8(2):155-184.',
    date: 1991,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Molecular history of gene conversions in the primate fetal γ-globin genes:  nucleotide sequences from the common gibbon, Hylobates lar.',
    authors: ['D.H.A. Fitch', 'C. Mainone', 'M. Goodman', 'J.L. Slightom',],
    citation:
      'Fitch, D. H. A., Mainone, C., Goodman, M., and Slightom, J. L., 1990.  Molecular history of gene conversions in the primate fetal γ-globin genes:  nucleotide sequences from the common gibbon, Hylobates lar.  J. Biol. Chem. 265(2):781-793.',
    date: 1990,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'On the origins of tandemly repeated genes:  does histone gene copy number in Drosophila reflect chromosome location?',
    authors: ['D.H.A. Fitch', 'L.D. Strausbaugh', 'V. Barrett',],
    citation:
      'Fitch, D. H. A., Strausbaugh, L. D., and Barrett, V., 1990.  On the origins of tandemly repeated genes:  does histone gene copy number in Drosophila reflect chromosome location?  Chromosoma 99(2):118-124.',
    date: 1990,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'Primate evolution at the DNA level and a classification of the hominoids.',
    authors: [
      'M. Goodman',
      'D.A. Tagle',
      'D.H.A. Fitch',
      'W.J. Bailey',
      'J. Czelusniak',
      'B.F. Koop',
      'P. Benson',
      'J.L. Slightom',
    ],
    citation:
      'Goodman, M., Tagle, D. A., Fitch, D. H. A., Bailey, W., Czelusniak, J., Koop, B. F., Benson, P., and Slightom, J. L., 1990.  Primate evolution at the DNA level and a classification of the hominoids.  J. Mol. Evol. 30(3):260-266.',
    date: 1990,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Molecular phylogeny of the family of apes and humans.',
    authors: [
      'M. Goodman',
      'B.F. Koop',
      'J. Czelusniak',
      'D.H.A. Fitch',
      'D.A. Tagle',
      'J.L. Slightom',
    ],
    citation:
      'Goodman, M., Koop, B. F., Czelusniak, J., Fitch, D. H. A., Tagle, D. A., and Slightom, J. L., 1989.  Molecular phylogeny of the family of apes and humans.  Genome 31(1):316-335.',
    date: 1989,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title:
      'The spider monkey Ψη-globin gene and surrounding sequences:  recent or ancient insertions of LINEs and SINEs?',
    authors: ['D.H.A. Fitch', 'C. Mainone', 'J.L. Slightom', 'M. Goodman',],
    citation:
      'Fitch, D. H. A., Mainone, C., Slightom, J. L., and Goodman, M., 1988.  The spider monkey Ψη-globin gene and surrounding sequences:  recent or ancient insertions of LINEs and SINEs?  Genomics 3(3):237-255.',
    date: 1988,
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
];

const Papers = () => (
  <div className={styles.container}>
    <h1 className={styles.header}>Systematics and evolution of Rhabditidae</h1>
    <Publications publicationSet={rhabditidaePapers} />
    <h1 className={styles.header}>
      Mechanisms and evolution of male tail morphogenesis
    </h1>
    <Publications publicationSet={maleTailMorphogenesis} />
    <h1 className={styles.header}>
      Molecular evolution (recombination, primate globins, Drosophila histones,
      transposons)
    </h1>
    <Publications publicationSet={molecularEvolution} />
  </div>
);

export default Papers;
