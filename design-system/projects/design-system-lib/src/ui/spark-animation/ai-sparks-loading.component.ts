import { 
  ChangeDetectionStrategy, 
  Component, 
  input,
  computed,
  signal,
  effect,
  DestroyRef
} from '@angular/core';
import { SparkConfig } from './spark-animation.types';

/**
 * Loading sparks component that shows orbital animation
 */
@Component({
  selector: 'ds-ai-sparks-loading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ai-sparks-loading">
      @if (isLoading()) {
        <div 
          class="ai-sparks-loading__wrapper ai-sparks-loading__wrapper--loading"
          [class.ai-sparks-loading__wrapper--appear]="isAnimating()">
          <div class="particle-container">
            @for (particle of particles; track particle.id) {
              <span 
                class="pt"
                [style.--x]="particle.x"
                [style.--y]="particle.y"
                [style.--xt]="particle.xt"
                [style.--yt]="particle.yt"
                [style.--xd]="particle.xd"
                [style.--yd]="particle.yd"
                [style.--w]="particle.w"
                [style.--d]="particle.d"
                [style.--o]="particle.o"
                [style.--color]="particle.color">
                <b></b>
              </span>
            }
          </div>
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
      } @else {
        <div 
          class="ai-sparks-loading__wrapper ai-sparks-loading__wrapper--static"
          [class.ai-sparks-loading__wrapper--appear]="isAnimating()">
          @for (spark of sparks(); track spark.id) {
            <img
              [src]="sparkImagePath()"
              [class]="getSparkClasses(spark)"
              [style.left.px]="spark.position.x"
              [style.top.px]="spark.position.y"
              alt=""
              draggable="false">
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./ai-sparks-loading.component.css']
})
export class AiSparksLoadingComponent {
  /** Particle colors from the design system */
  private readonly particleColors = [
    '#0AB7CA', // Light blue
    '#4255E9', // Blue
    '#6D18DC', // Purple
    '#8B00F5', // Deep purple
    '#F414BC'  // Pink
  ];

  /** Particle configurations */
  protected readonly particles = [
    // Center cluster - larger particles with lower opacity
    { id: 'p1', x: 60, y: 4, xt: 4, yt: 3, xd: 1, yd: 1, w: 5, d: 1, o: 0.4, color: this.particleColors[0] },
    { id: 'p2', x: 59, y: 3, xt: 5, yt: 4, xd: 1.2, yd: 1, w: 4.5, d: 6, o: 0.4, color: this.particleColors[1] },
    { id: 'p3', x: 61, y: 5, xt: 6, yt: 3.5, xd: 1.5, yd: 1.2, w: 4.8, d: 4, o: 0.4, color: this.particleColors[2] },
    { id: 'p4', x: 60, y: 2, xt: 4.5, yt: 2.5, xd: 0.8, yd: 0.8, w: 4.2, d: 2, o: 0.4, color: this.particleColors[3] },
    { id: 'p5', x: 60, y: 6, xt: 5.5, yt: 4.5, xd: 1.1, yd: 1, w: 4.5, d: 0, o: 0.4, color: this.particleColors[4] },
    
    // Left side - medium particles with medium opacity
    { id: 'p6', x: 57, y: 1, xt: 3.5, yt: 3, xd: 0.9, yd: 1.4, w: 3.3, d: 9, o: 0.6, color: this.particleColors[0] },
    { id: 'p7', x: 55, y: 4, xt: 5, yt: 4, xd: 1.3, yd: 1.1, w: 3.8, d: 2, o: 0.6, color: this.particleColors[1] },
    { id: 'p8', x: 56, y: 7, xt: 4, yt: 3.5, xd: 1, yd: 1.2, w: 2.7, d: 8, o: 0.7, color: this.particleColors[2] },
    { id: 'p9', x: 58, y: 0, xt: 3, yt: 2.5, xd: 0.7, yd: 0.8, w: 4, d: 5, o: 0.5, color: this.particleColors[3] },
    { id: 'p10', x: 56, y: 5, xt: 4.5, yt: 3.5, xd: 1.4, yd: 1, w: 3, d: 6, o: 0.6, color: this.particleColors[4] },
    
    // Right side - smaller particles with higher opacity
    { id: 'p11', x: 64, y: 3, xt: 3.5, yt: 3, xd: 0.8, yd: 0.9, w: 3.2, d: 9, o: 0.7, color: this.particleColors[0] },
    { id: 'p12', x: 63, y: 6, xt: 5, yt: 4, xd: 1.2, yd: 1, w: 2.8, d: 12, o: 0.7, color: this.particleColors[1] },
    { id: 'p13', x: 62, y: 2, xt: 4, yt: 3, xd: 1, yd: 1.1, w: 2.6, d: 5, o: 0.7, color: this.particleColors[2] },
    { id: 'p14', x: 65, y: 1, xt: 5.5, yt: 4.5, xd: 1.5, yd: 1.3, w: 2.5, d: 0, o: 0.8, color: this.particleColors[3] },
    { id: 'p15', x: 61, y: 4, xt: 4.5, yt: 3.5, xd: 1.1, yd: 1, w: 2.4, d: 5, o: 0.8, color: this.particleColors[4] },
    
    // Additional particles - smallest particles with highest opacity
    { id: 'p16', x: 59, y: 8, xt: 4, yt: 3, xd: 1, yd: 1, w: 1.5, d: 3, o: 0.8, color: this.particleColors[0] },
    { id: 'p17', x: 61, y: 7, xt: 5, yt: 3.5, xd: 1.2, yd: 1.1, w: 1.8, d: 7, o: 0.8, color: this.particleColors[1] },
    { id: 'p18', x: 58, y: 3, xt: 4.5, yt: 4, xd: 1.3, yd: 1.2, w: 1.6, d: 10, o: 0.8, color: this.particleColors[2] },
    { id: 'p19', x: 62, y: 5, xt: 3.5, yt: 3, xd: 0.9, yd: 0.9, w: 1.7, d: 4, o: 0.8, color: this.particleColors[3] },
    { id: 'p20', x: 60, y: 1, xt: 5, yt: 4, xd: 1.4, yd: 1.3, w: 1.4, d: 8, o: 0.8, color: this.particleColors[4] }
  ];

  /** Path to the spark image asset */
  readonly sparkImagePath = input<string>('/Assets/ai-spark.png');

  /** Whether the loading animation is active */
  readonly isLoading = input<boolean>(false);
  
  /** Optional custom spark configurations */
  readonly customSparks = input<SparkConfig[] | undefined>(undefined);

  /** Animation state signal */
  protected readonly isAnimating = signal(false);

  /** Animation state for appear/disappear */
  protected readonly animationState = signal<'appear' | 'static' | 'disappear'>('static');

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
    // Handle isLoading changes
    effect(() => {
      // Reset animation state
      this.isAnimating.set(false);
      // Start animation after a brief delay
      setTimeout(() => this.isAnimating.set(true), 50);
    });
  }

  /**
   * Gets the combined CSS classes for a spark
   */
  getSparkClasses(spark: SparkConfig): string {
    const classes = [
      'ai-sparks-loading__spark',
      `ai-sparks-loading__spark--${spark.size}`
    ];
    
    if (this.isAnimating()) {
      classes.push('ai-sparks-loading__spark--animating');
    }
    
    return classes.join(' ');
  }
}
