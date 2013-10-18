package it.andreacapecci.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.giavacms.common.model.Search;
import org.giavacms.richcontent.model.RichContent;
import org.giavacms.richcontent.repository.RichContentRepository;

@Named
@RequestScoped
public class GlobalContent
{

   @Inject
   RichContentRepository richContentRepository;

   private List<RichContent> loadPhoto(List<RichContent> page)
   {
      // for (RichContent richContent : page)
      // {
      // richContentRepository.loadFirstPicture(richContent);
      // }
      return page;
   }

   public List<RichContent> getAppunti(String num)
   {
      return get("appunti", num);
   }

   public List<RichContent> getPost(String num)
   {
      return get("blog", num);
   }

   public List<RichContent> getLavori(String num)
   {
      return get("lavori", num);
   }

   public List<RichContent> get(String type, String num)
   {
      Search<RichContent> search = new Search<RichContent>(RichContent.class);
      search.getObj().getRichContentType().setName(type);
      return loadPhoto(richContentRepository.getList(search, 0, Integer.parseInt(num)));
   }
}
