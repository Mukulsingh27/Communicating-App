import {domEventsHandler} from '../util/domEventsHandler';
import {helperFunctions} from '../lib/helperFunctions';

class _analyticEvents {
    constructor() {
        this.params = {};
    }

    setParams(params, attributes) {
        this.params = params;
        this.attributes = attributes;
        this.initMonitoring();
    }

    initMonitoring() {
        this.params['ga']['events'].forEach((itemList) => {
            this.attributes.eventEmitter.addListener(itemList.ev, (params) => {

                var item = JSON.parse(JSON.stringify(itemList));

                if (item.ev == 'hideInvitation' && typeof params !== 'undefined' && params.full) {
                    return ;
                }

                var label = item.el;

                // Set invitation name
                if (item.ev == 'trackingEvent' && typeof params !== 'undefined') {
                    item.ev = params.ev | item.ev;
                    item.ec = params.ec || item.ec;
                    item.ea = params.ea || item.ea;
                    label = params.el || item.el;
                } else if ((item.ev == 'showInvitation' || item.ev == 'readInvitation' || item.ev == 'fullInvitation' || item.ev == 'cancelInvitation') && typeof params !== 'undefined' && params.name) {
                    label = label || params.name;
                } else if (item.ev == 'botTrigger') {
                    if (typeof params !== 'undefined' && params.trigger && params.trigger.length > 0) {
                        params.trigger.forEach((triggerLabel) => {
                            var js = this.params['ga']['js'].replace(
                                /\{\{eventCategory\}\}/g,JSON.stringify(item.ec)
                            ).replace(
                                /\{\{eventAction\}\}/g,JSON.stringify(item.ea)
                            ).replace(
                                /\{\{eventLabel\}\}/g,JSON.stringify(triggerLabel)
                            ).replace(
                                /\{\{eventInternal\}\}/g,JSON.stringify(item.ev)
                            );

                            try {
                                eval(js);
                            } catch (err) {
                                console.log(err);
                            }
                        });
                        return ;
                    } else {
                        return;
                    }
                }

                 var js = this.params['ga']['js'].replace(
                     /\{\{eventCategory\}\}/g,JSON.stringify(item.ec)
                 ).replace(
                     /\{\{eventAction\}\}/g,JSON.stringify(item.ea)
                 ).replace(
                     /\{\{eventLabel\}\}/g,JSON.stringify(label)
                 ).replace(
                     /\{\{eventInternal\}\}/g,JSON.stringify(item.ev)
                 );


                 try {
                     eval(js);
                 } catch (err) {
                    console.log(err);
                 }

            });
        });
    }


}

const analyticEvents = new _analyticEvents();
export {analyticEvents};