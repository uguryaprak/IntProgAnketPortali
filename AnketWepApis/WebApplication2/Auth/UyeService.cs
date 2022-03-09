using AnketWebApis.Models;
using AnketWebApis.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketWebApis.Auth
{
    public class UyeService
    {
        AnketDBEntities db = new AnketDBEntities();
        public UyeModel UyeOturumAc(string KullaniciAdi, string parola)
        {
            UyeModel uye = db.Uyes.Where(s => s.KullaniciAdi == KullaniciAdi && s.Sifre == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                AdSoyad = x.AdSoyad,
                KullaniciAdi = x.KullaniciAdi,
                Email = x.Email,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin

            }).SingleOrDefault();
            return uye;
        }
    }
}