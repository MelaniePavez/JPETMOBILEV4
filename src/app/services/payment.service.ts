import { Injectable } from '@angular/core';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private functions = getFunctions(app);

  constructor() {}

  // Llama a la función de Firebase para crear sesión de Stripe
  async createCheckoutSession(amount: number, productName: string): Promise<string> {
    const createStripeSession = httpsCallable(this.functions, 'createStripeSession');
    const result: any = await createStripeSession({ amount, productName });
    return result.data.url; // URL del checkout
  }
}
