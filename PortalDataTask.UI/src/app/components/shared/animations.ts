import { trigger, state, transition, animate, style } from '@angular/animations';

export class Animations {
    public static slideInOut = trigger('slideInOut', [
        state('true', style({ height: '*' })),
        state('false', style({ height: '0px' })),
        transition('1 => 0', animate('300ms ease-in')),
        transition('0 => 1', animate('300ms ease-out'))
    ]);
    public static visibilityChanged = trigger('visibilityChanged', [
        state('true', style({ opacity: 1 })),
        state('false', style({ opacity: 0 })),
        transition('1 => 0', animate('600ms')),
        transition('0 => 1', animate('300ms')),
    ]);
}