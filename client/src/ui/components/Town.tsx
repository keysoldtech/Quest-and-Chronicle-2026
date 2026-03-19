import type { HeroInstance } from '../../data/types';
import { HeroCardView } from './Card';

interface TownProps {
  heroes: HeroInstance[];
  heroOrdinaryCount: number;
  heroEpicCount: number;
}

export function TownView({ heroes, heroOrdinaryCount, heroEpicCount }: TownProps) {
  return (
    <div className="town-view">
      <div className="town-header">
        <h3>Town</h3>
        <div className="deck-counts">
          <span title="Ordinary heroes remaining">&#127183; {heroOrdinaryCount} ordinary</span>
          <span title="Epic heroes remaining">&#11088; {heroEpicCount} epic</span>
        </div>
      </div>
      <div className="town-heroes">
        {heroes.length === 0 ? (
          <div className="town-empty">No heroes in town</div>
        ) : (
          heroes.map((hero, i) => (
            <HeroCardView
              key={`${hero.card.id}-${i}`}
              hero={hero.card}
              currentHP={hero.currentHP}
            />
          ))
        )}
      </div>
    </div>
  );
}
