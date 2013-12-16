package it.vandel.paypal.service;

import javax.ejb.Local;
import javax.ejb.Stateless;

import org.giavacms.paypalweb.model.ShoppingCart;
import org.giavacms.paypalweb.service.PaypalSubmitService;

@Stateless
@Local(PaypalSubmitService.class)
public class PaypalSubmitVerificationService implements PaypalSubmitService
{

   @Override
   public boolean isReady(ShoppingCart shoppingCart)
   {
      if (shoppingCart.getShippingAddress().getCountryCode() != null
               && shoppingCart.getShippingAddress().getCountryCode().toUpperCase().equals("IT"))
      {
         return true;
      }
      else if (shoppingCart.getShippingAddress().getCountryCode() != null
               && !shoppingCart.getShippingAddress().getCountryCode().toUpperCase().equals("IT"))
      {
         if (shoppingCart.getTotal() > 120)
            return true;
      }
      return false;
   }
}
