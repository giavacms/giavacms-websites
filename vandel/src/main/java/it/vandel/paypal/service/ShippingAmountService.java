/*
 * Copyright 2013 GiavaCms.org.
 *
 * Licensed under the Eclipse Public License version 1.0, available at
 * http://www.eclipse.org/legal/epl-v10.html
 */
package it.vandel.paypal.service;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;

import org.giavacms.paypalweb.model.ShoppingCart;
import org.giavacms.paypalweb.service.ShippingService;
import org.jboss.logging.Logger;

@Stateless
@Local(ShippingService.class)
public class ShippingAmountService implements ShippingService
{

   Logger logger = Logger.getLogger(getClass().getName());

   static List<String> getProvince()
   {
      List<String> province = new ArrayList<String>();
      province.add("AG");
      province.add("AN");
      province.add("AQ");
      province.add("AR");
      province.add("AP");
      province.add("AT");
      province.add("AV");
      province.add("BA");
      province.add("BT");
      province.add("BL");
      province.add("BN");
      province.add("BG");
      province.add("BI");
      province.add("BO");
      province.add("BZ");
      province.add("BS");
      province.add("BR");
      province.add("CA");
      province.add("CL");
      province.add("CB");
      province.add("CE");
      province.add("CT");
      province.add("CZ");
      province.add("CH");
      province.add("CO");
      province.add("CS");
      province.add("CR");
      province.add("KR");
      province.add("CN");
      province.add("EN");
      province.add("FM");
      province.add("FE");
      province.add("FI");
      province.add("FG");
      province.add("FC");
      province.add("FR");
      province.add("GE");
      province.add("GO");
      province.add("GR");
      province.add("IM");
      province.add("IS");
      province.add("SP");
      province.add("LT");
      province.add("LE");
      province.add("LC");
      province.add("LI");
      province.add("LO");
      province.add("LU");
      province.add("MC");
      province.add("MN");
      province.add("MS");
      province.add("MT");
      province.add("ME");
      province.add("MI");
      province.add("MO");
      province.add("MB");
      province.add("NA");
      province.add("NO");
      province.add("NU");
      province.add("OR");
      province.add("PD");
      province.add("PA");
      province.add("PR");
      province.add("PV");
      province.add("PG");
      province.add("PU");
      province.add("PE");
      province.add("PC");
      province.add("PI");
      province.add("PT");
      province.add("PN");
      province.add("PZ");
      province.add("PO");
      province.add("RG");
      province.add("RA");
      province.add("RC");
      province.add("RE");
      province.add("RI");
      province.add("RN");
      province.add("RM");
      province.add("RO");
      province.add("SA");
      province.add("SS");
      province.add("SV");
      province.add("SI");
      province.add("SR");
      province.add("SO");
      province.add("TA");
      province.add("TE");
      province.add("TR");
      province.add("TO");
      province.add("TP");
      province.add("TN");
      province.add("TV");
      province.add("TS");
      province.add("UD");
      province.add("VA");
      province.add("VE");
      province.add("VB");
      province.add("VC");
      province.add("VR");
      province.add("VV");
      province.add("VI");
      province.add("VT");
      return province;
   }

   /*
    * In Italia, per spese sotto i 40 euro vanno aggiunti 5 euro di contributo spese In Italia, per spese sopra i 40
    * euro la spedizione è gratuita Per estero, spesa minima 120 euro spedizione inclusa
    */
   public double calculate(ShoppingCart shoppingCart)
   {
      if (isItalian(shoppingCart.getShippingAddress().getCountryCode(), shoppingCart.getShippingAddress().getState()))
      {
         if (shoppingCart.getTotal() > 45)
         {
            logger.info("IT Total() >= 45: 0");
            return Double.valueOf("0");
         }
         else
         {
            logger.info("IT Total() < 45: 9");
            return Double.valueOf("9");
         }
      }
      else
      {
         return Double.valueOf("0");
      }
   }

   private static boolean isItalian(String countryCode, String state)
   {
      if (countryCode != null && countryCode.toUpperCase().equals("IT")
      // && state != null && !state.trim().isEmpty()
      // && getProvince().contains(state.trim().toUpperCase())
      )
         return true;
      return false;
   }

}
