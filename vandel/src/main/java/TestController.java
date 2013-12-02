import javax.enterprise.inject.Model;
import javax.inject.Inject;

import org.giavacms.common.annotation.HttpParam;

@Model
public class TestController
{

   @Inject
   @HttpParam(value = "category")
   String category;

   public TestController()
   {
   }

   public void log()
   {
      System.out.println("category: " + category);
   }

   public String getCategory()
   {
      return category;
   }

   public void setCategory(String category)
   {
      this.category = category;
   }

}
