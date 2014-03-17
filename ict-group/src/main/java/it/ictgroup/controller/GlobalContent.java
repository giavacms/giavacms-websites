package it.ictgroup.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.giavacms.base.controller.request.PageRequestController;
import org.giavacms.base.model.Page;
import org.giavacms.base.repository.PageRepository;
import org.giavacms.common.model.Search;
import org.giavacms.richcontent.model.RichContent;
import org.giavacms.richcontent.repository.RichContentRepository;

@Named
@RequestScoped
public class GlobalContent
{

   Page basePage;

   @Inject
   PageRequestController pageRequestController;

   @Inject
   PageRepository pageRepository;

   @Inject
   RichContentRepository richContentRepository;

   private List<RichContent> loadPhoto(List<RichContent> page)
   {
      return page;
   }

   public List<RichContent> getNews(String num)
   {
      return get("news", num);
   }

   public List<RichContent> getPost(String num)
   {
      return get("blog", num);
   }

   public List<RichContent> get(String type, String num)
   {
      Search<RichContent> search = new Search<RichContent>(RichContent.class);
      search.getObj().getRichContentType().setName(type);
      search.getObj().setLang(getBasePage() == null ? 0 : getBasePage().getLang());
      return loadPhoto(richContentRepository.getList(search, 0, Integer.parseInt(num)));
   }

   protected Page getBasePage()
   {
      if (basePage == null)
      {
         if (pageRequestController.getElement() != null && pageRequestController.getElement().getId() != null)
         {
            if (pageRequestController.getElement().getTitle() != null)
            {
               basePage = pageRequestController.getElement();
            }
            else
            {
               basePage = pageRepository.find(pageRequestController.getElement().getId());
            }
         }
      }
      return basePage;
   }
}