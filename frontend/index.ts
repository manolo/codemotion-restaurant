import { Flow } from '@vaadin/flow-frontend/Flow';
import { Router } from '@vaadin/router';
import './global-styles';

import client from './generated/connect-client.default';
import { DeferredCallSubmitter } from '@vaadin/flow-frontend';
client.deferredCallHandler = {
	async handleDeferredCallSubmission(deferredCallSubmitter: DeferredCallSubmitter) {
		try {
      await deferredCallSubmitter.submit();
      (document.querySelector('orders-view') as any).refreshGrid();
		} catch (error) {
			deferredCallSubmitter.keepDeferredCallInTheQueue();
		}
	}
}

// if (navigator.onLine) {
//   client.submitDeferredCalls();
// }

// window.addEventListener('online',  () => {
//   console.log(navigator.onLine)
//   if (navigator.onLine) {
//     setTimeout(() => {
//       const orders = document.querySelector('orders-view') as any;
//       if (orders) {
//         orders.refreshGrid();
//         orders.grid.size = orders.grid.items.length;
//       }
//     }, 100);
//     (document.querySelector('orders-view') as any)?.connectedCallback();
//   }
// });


const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'main-view',
    action: async () => {
      await import('./views/main/main-view');
    },
    children: [
      {
        path: '',
        component: 'orders-view',
        action: async () => {
          await import('./views/orders/orders-view');
        },
      },
      {
        path: 'about',
        component: 'about-view',
        action: async () => {
          await import('./views/about/about-view');
        },
      },
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
