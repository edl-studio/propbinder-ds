import { 
  ChangeDetectionStrategy, 
  Component, 
  input,
  computed,
  effect,
  signal,
  DestroyRef
} from '@angular/core';
import { SparkConfig } from './spark-animation.types';

export type SparkAnimationState = 'appear' | 'static' | 'disappear';

/**
 * Static sparks component with individual appear/disappear animations
 */
@Component({
  selector: 'ds-ai-sparks-static',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ai-sparks-static">
      @for (spark of sparks(); track spark.id) {
        <img
          [src]="sparkImagePath()"
          [class]="getSparkClasses(spark)"
          [style.left.px]="spark.position.x"
          [style.top.px]="spark.position.y"
          [style.animation-delay.ms]="spark.delay"
          alt=""
          draggable="false">
      }
    </div>
  `,
  styleUrls: ['./ai-sparks-static.component.css']
})
export class AiSparksStaticComponent {
  /** Path to the spark image asset */
  readonly sparkImagePath = input<string>('/Assets/ai-spark.png');
  
  /** Current animation state */
  readonly animationState = input<SparkAnimationState>('static');
  
  /** Optional custom spark configurations */
  readonly customSparks = input<SparkConfig[] | undefined>(undefined);

  /** Animation state signal */
  protected readonly isAnimating = signal(false);

  /** Default spark configuration */
  private readonly defaultSparks: SparkConfig[] = [
    {
      id: 'large-spark',
      size: 'large',
      position: { x: 2, y: 7 },
      delay: 0,
      rotation: -15
    },
    {
      id: 'medium-spark',
      size: 'medium', 
      position: { x: 36, y: 28 },
      delay: 250,
      rotation: 25
    },
    {
      id: 'small-spark',
      size: 'small',
      position: { x: 36, y: 5 },
      delay: 500,
      rotation: -30
    }
  ];

  /** Computed value for active sparks configuration */
  readonly sparks = computed(() => 
    this.customSparks() ?? this.defaultSparks
  );

  constructor(private destroyRef: DestroyRef) {
    // Handle animation state changes
    effect(() => {
      const state = this.animationState();
      if (state === 'appear' || state === 'disappear') {
        // Reset animation state
        this.isAnimating.set(false);
        // Start animation after a brief delay
        setTimeout(() => this.isAnimating.set(true), 50);
      }
    });
  }

  /**
   * Gets the combined CSS classes for a spark
   */
  getSparkClasses(spark: SparkConfig): string {
    const classes = [
      'ai-sparks-static__spark',
      `ai-sparks-static__spark--${spark.size}`,
      `ai-sparks-static__spark--${this.animationState()}`
    ];
    
    if (this.isAnimating()) {
      classes.push('ai-sparks-static__spark--animating');
    }
    
    return classes.join(' ');
  }
}