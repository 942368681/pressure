/*
This adapter is more iOS devices running iOS 10 or higher and support 3D touch.
*/

class Adapter3DTouch extends Adapter{

  constructor(element){
    super(element);
    this.$support();
    this.$start();
    this.$change();
    this.$startDeepPress();
    this.$endDeepPress();
    this.$end();
  }

  // Support check methods
  $support(){
    this.add('touchforcechange', this.enabled);
    this.add('touchstart', this.supportCallback.bind(this));
  }

  enabled(event){
    event.preventDefault();
    Support.didSucceed('force');
  }

  supportCallback(event){
    if(Support.forPressure === true || this.polyfill instanceof AdapterPolyfill){
      this.remove('touchforcechange', this.enabled);
      this.preventDefault(event);
    } else {
      this.failOrPolyfill(event);
    }
  }

  $start(){
    // call 'start' when the mouse goes down
    this.add('touchstart', (event) => {
      if(Support.forPressure){
        this.setPressed(true);
        runClosure(this.block, 'start', this.el, event);
      }
    });
  }

  $change(){
    this.add('touchforcechange', (event) => {
      if(Support.forPressure && event.webkitForce !== 0 && this.pressed){
        runClosure(this.block, 'change', this.el, this.normalizeForce(event.webkitForce), event);
      }
    });
  }

  $end(){
    // call 'end' when the mouse goes up or leaves the element
    this.add('touchend', () => {
      if(Support.forPressure){
        this.setPressed(false);
        runClosure(this.block, 'end', this.el);
      }
    });
    // this.add('mouseleave', () => {
    //   if(Support.forPressure){
    //     if(this.pressed){
    //       runClosure(this.block, 'end', this.el);
    //     }
    //     this.setPressed(false);
    //   }
    // });
  }

  // $startDeepPress(){
  //   this.add('webkitmouseforcedown', (event) => {
  //     if(Support.forPressure){
  //       this.setDeepPressed(true);
  //       runClosure(this.block, 'startDeepPress', this.el, event);
  //     }
  //   });
  // }

  // $endDeepPress(){
  //   this.add('webkitmouseforceup', () => {
  //     if(Support.forPressure){
  //       this.setDeepPressed(false);
  //       runClosure(this.block, 'endDeepPress', this.el);
  //     }
  //   });
  //   this.add('mouseleave', () => {
  //     if(Support.forPressure){
  //       if(this.deepPressed){
  //         runClosure(this.block, 'endDeepPress', this.el);
  //       }
  //       this.setDeepPressed(false);
  //     }
  //   });
  // }

  // // make the force the standard 0 to 1 scale and not the 1 to 3 scale
  // normalizeForce(force){
  //   return this.reachOne(map(force, 1, 3, 0, 1));
  // }

  // // if the force value is above 0.999 set the force to 1
  // reachOne(force){
  //   return force > 0.999 ? 1 : force;
  // }

}
