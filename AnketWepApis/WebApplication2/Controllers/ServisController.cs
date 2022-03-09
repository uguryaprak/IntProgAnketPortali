using AnketWebApis.Models;
using AnketWebApis.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace AnketWebApis.Controllers
{
    public class ServisController : ApiController
    {
        AnketDBEntities database = new AnketDBEntities();
        SonucVM sonuc = new SonucVM();
        [HttpGet]
        [Route("api/anket/list")]
        public List<AnketVM> AnketList()
        {
            List<AnketVM> anketlist = database.Ankets.Select(s => new AnketVM()
            {
                AnketId = s.AnketId,
                AnketAciklama = s.AnketAciklama,
                KonuId = s.KonuId,
                OlusturanKullanici = s.OlusturanKullanici,

            }).ToList();
            foreach (var anketler in anketlist)
            {
                KonularVM konulist = database.Konulars.Where(s => s.KonuId == anketler.KonuId).Select(x => new KonularVM()
                {
                    KonuId = x.KonuId,
                    KonuAdi = x.KonuAdi,
                }).FirstOrDefault();

                UyeModel kullanicilist = database.Uyes.Where(a => a.uyeId == anketler.OlusturanKullanici).Select(b => new UyeModel()
                {
                    uyeId = b.uyeId,
                    KullaniciAdi = b.KullaniciAdi,
                    AdSoyad = b.AdSoyad,
                    Email = b.Email,
                    Sifre = b.Sifre,
                    UyeAdmin = b.UyeAdmin
                }).FirstOrDefault();
                anketler.konuBilgi = konulist;
                anketler.kullaniciBilgi = kullanicilist;
            }
            
            return anketlist;
        }


        [HttpGet]
        [Route("api/anket/listbykonu/{konu}")]
        public List<AnketVM> AnketListeKonu(string konu)
        {
            List<AnketVM> anketlist = database.Ankets.Where(x => x.Konular.KonuAdi == konu).Select(s => new AnketVM()
            {
                AnketId = s.AnketId,
                AnketAciklama = s.AnketAciklama,
                KonuId = s.KonuId,
                OlusturanKullanici = s.OlusturanKullanici,
            }).ToList();
            foreach (var anketler in anketlist)
            {
                KonularVM konulist = database.Konulars.Where(s => s.KonuId == anketler.KonuId).Select(x => new KonularVM()
                {
                    KonuId = x.KonuId,
                    KonuAdi = x.KonuAdi,
                }).FirstOrDefault();

                UyeModel kullanicilist = database.Uyes.Where(a => a.uyeId == anketler.OlusturanKullanici).Select(b => new UyeModel()
                {
                    uyeId = b.uyeId,
                    KullaniciAdi = b.KullaniciAdi,
                    AdSoyad = b.AdSoyad,
                    Email = b.Email,
                    Sifre = b.Sifre,
                    UyeAdmin = b.UyeAdmin,
                }).FirstOrDefault();
                anketler.konuBilgi = konulist;
                anketler.kullaniciBilgi = kullanicilist;
            }
            return anketlist;
        }
        [HttpGet]
        [Route("api/anket/listbykullanici/{kullaniciAdi}")]
        public List<AnketVM> AnketListeKullanici(string kullaniciAdi)
        {
            List<AnketVM> anketlist = database.Ankets.Where(x => x.Uye.KullaniciAdi == kullaniciAdi).Select(s => new AnketVM()
            {
                AnketId = s.AnketId,
                AnketAciklama = s.AnketAciklama,
                KonuId = s.KonuId,
                OlusturanKullanici = s.OlusturanKullanici,
            }).ToList();
            foreach (var anketler in anketlist)
            {
                KonularVM konulist = database.Konulars.Where(s => s.KonuId == anketler.KonuId).Select(x => new KonularVM()
                {
                    KonuId = x.KonuId,
                    KonuAdi = x.KonuAdi,
                }).FirstOrDefault();

                UyeModel kullanicilist = database.Uyes.Where(a => a.uyeId == anketler.OlusturanKullanici).Select(b => new UyeModel()
                {
                    uyeId = b.uyeId,
                    KullaniciAdi = b.KullaniciAdi,
                    AdSoyad = b.AdSoyad,
                    Email = b.Email,
                    Sifre = b.Sifre,
                    UyeAdmin = b.UyeAdmin,
                }).FirstOrDefault();
                anketler.konuBilgi = konulist;
                anketler.kullaniciBilgi = kullanicilist;
            }
            return anketlist;
        }



        [HttpGet]
        [Route("api/anket/listbyid/{anketId}")]
        public AnketVM AnketListeBYId(int anketId)
        {
            AnketVM anketlist = database.Ankets.Where(x => x.AnketId == anketId).Select(s => new AnketVM()
            {
                AnketId = s.AnketId,
                AnketAciklama = s.AnketAciklama,
                KonuId = s.KonuId,
                OlusturanKullanici = s.OlusturanKullanici,
            }).FirstOrDefault();
            KonularVM konulist = database.Konulars.Where(s => s.KonuId == anketlist.KonuId).Select(x => new KonularVM()
            {
                KonuId = x.KonuId,
                KonuAdi = x.KonuAdi,
            }).FirstOrDefault();

            UyeModel kullanicilist = database.Uyes.Where(a => a.uyeId == anketlist.OlusturanKullanici).Select(b => new UyeModel()
            {
                uyeId = b.uyeId,
                KullaniciAdi = b.KullaniciAdi,
                AdSoyad = b.AdSoyad,
                Email = b.Email,
                Sifre = b.Sifre,
                UyeAdmin = b.UyeAdmin,
            }).FirstOrDefault();
            anketlist.konuBilgi = konulist;
            anketlist.kullaniciBilgi = kullanicilist;
            return anketlist;
        }



        [HttpPost]
        [Route("api/anket/add")]
        public SonucVM AnketAdd(AnketVM anket)
        {
            if (database.Ankets.Where(s => s.AnketId == anket.AnketId).Count() > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Anket Kayıtlıdır :::: BU HATAYI VERİRSE VERİ TABANINDA SIKINTI VARDIR";
                return sonuc;
            }
            Anket newanket = new Anket();
            newanket.AnketAciklama = anket.AnketAciklama;
            newanket.KonuId = anket.KonuId;
            newanket.OlusturanKullanici = anket.OlusturanKullanici;
            database.Ankets.Add(newanket);
            database.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Başarıyla oluşturuldu lütfen ankete soru girmeyi unutmayınz!";
            return sonuc;
        }

        [HttpPut]
        [Route("api/anket/update")]
        public SonucVM AnketUpdate(AnketVM anket)
        {
            Anket anketlist = database.Ankets.Where(s => s.AnketId == anket.AnketId).FirstOrDefault();
            if (anketlist == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı";
                return sonuc;
            }
            else
            {
                anketlist.AnketAciklama = anket.AnketAciklama;
                anketlist.KonuId = anket.KonuId;
                //Oluşturan kullanıcı değiştirilemiyor
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Düzenleme Başarılı";
                return sonuc;
            }
        }

        [HttpDelete]
        [Route("api/anket/delete/{AnketId}")]
        public SonucVM AnketDelete(int AnketId)
        {
            Anket anketler = database.Ankets.Where(s => s.AnketId == AnketId).FirstOrDefault();
            if (anketler == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı";
                return sonuc;
            }
            else
            {
                List<AnketSoru> anketinsoruları = database.AnketSorus.Where(s => s.AnketId == AnketId).ToList();
                foreach (var item in anketinsoruları)
                {
                    AnketSoruDelete(item.AnketSoruId);
                }
                List<SecilenCevaplar> secCevaplar = database.SecilenCevaplars.Where(s => s.SecCevAnketId == AnketId).ToList();
                foreach (var seceneklers in secCevaplar)
                {
                    database.SecilenCevaplars.Remove(seceneklers);
                }
                Thread.Sleep(500);
                database.Ankets.Remove(anketler);
                database.SaveChangesAsync();
                sonuc.islem = true;
                sonuc.mesaj = "Anket başarıyla silindi";
                return sonuc;
            }
        }


        [HttpGet]
        [Route("api/anketsoru/list/{anketId}")]
        public List<AnketSoruVM> AnketList(int anketId)
        {
            List<AnketSoruVM> anketsorular = database.AnketSorus.Where(s => s.AnketId == anketId).Select(x => new AnketSoruVM()
            {
                AnketSoruId = x.AnketSoruId,
                Soru = x.Soru,
            }).ToList();
            foreach (var item in anketsorular)
            {
                List<AnketSeceneklerVM> anketsec = database.AnketSeceneklers.Where(x => x.AnketSoruId == item.AnketSoruId).Select(a => new AnketSeceneklerVM()
                {
                    AnketSoruId = a.AnketSoruId,
                    AnketSeceneklerId = a.AnketSeceneklerId,
                    AnketSecenekYazi = a.AnketSecenekYazi,

                }).ToList();
                item.anketsorus = anketsec;
            }
            return anketsorular;
        }
        [HttpPost]
        [Route("api/anketsoru/add")]
        public SonucVM AnketSoruAdd(AnketSoruVM anketsecenek)
        {
            AnketSoru anketsoru = new AnketSoru();
            anketsoru.Soru = anketsecenek.Soru;
            anketsoru.AnketId = anketsecenek.AnketId;
            foreach (var item in anketsecenek.anketsorus)
            {
                anketsoru.AnketSeceneklers.Add(new AnketSecenekler
                {
                    AnketSecenekYazi = item.AnketSecenekYazi
                });
            }
            database.AnketSorus.Add(anketsoru);
            int savecahangesSonuc = database.SaveChanges();
            if (savecahangesSonuc > 0)
            {
                sonuc.islem = true;
                sonuc.mesaj = "kayıtlar oluştu";
            }
            else
            {
                sonuc.islem = false;
                sonuc.mesaj = "hata oluştu";
            }
            return sonuc;

        }

        [HttpPut]
        [Route("api/anketsoru/update")]
        public SonucVM AnketSoruUpdate(AnketSoruVM anket)
        {
            AnketSoru anketlist = database.AnketSorus.Where(s => s.AnketSoruId == anket.AnketSoruId).FirstOrDefault();
            if (anketlist == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı";
                return sonuc;
            }
            else
            {
                anketlist.Soru = anket.Soru;
                foreach (var item in anket.anketsorus)
                {
                    AnketSecenekler secenekler = database.AnketSeceneklers.Where(x => x.AnketSeceneklerId == item.AnketSeceneklerId).FirstOrDefault();
                    secenekler.AnketSecenekYazi = item.AnketSecenekYazi;
                }
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Düzenleme Başarılı";
                return sonuc;
            }
        }

        [HttpDelete]
        [Route("api/anketsoru/delete/{soruId}")]
        public SonucVM AnketSoruDelete(int soruId)
        {
            Thread.Sleep(500);
            AnketSoru anketler = database.AnketSorus.Where(s => s.AnketSoruId == soruId).FirstOrDefault();
            if (anketler == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Sorusu Bulunamadı";
                return sonuc;
            }
            else
            {
                List<AnketSecenekler> anketsec = database.AnketSeceneklers.Where(x => x.AnketSoruId == soruId).ToList();
                database.AnketSorus.Remove(anketler);
                for (int i = 0; i < anketsec.Count; i++)
                {
                    database.AnketSeceneklers.Remove(anketsec[i]);
                }

                database.SaveChangesAsync();
                sonuc.islem = true;
                sonuc.mesaj = "Anket Sorusu ve Seçenekleri başarıyla silindi";
                return sonuc;
            }
        }

        [HttpGet]
        [Route("api/konu/list")]
        public List<KonularVM> KonuList()
        {
            List<KonularVM> konuliste = database.Konulars.Select(s => new KonularVM()
            {
                KonuId = s.KonuId,
                KonuAdi = s.KonuAdi,
            }).ToList();
            return konuliste;
        }

        [HttpPost]
        [Route("api/konu/add")]
        public SonucVM KonuAdd(KonularVM konu)
        {
            if (database.Konulars.Where(s => s.KonuAdi == konu.KonuAdi).Count() > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Konu Zaten Kayıtlıdır";
                return sonuc;
            }
            Konular newkonu = new Konular();
            newkonu.KonuAdi = konu.KonuAdi;
            database.Konulars.Add(newkonu);
            database.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kaydetme Başarılı";
            return sonuc;
        }

        [HttpPut]
        [Route("api/konu/update")]
        public SonucVM KonuUpdate(KonularVM konu)
        {
            Konular konular = database.Konulars.Where(s => s.KonuId == konu.KonuId).FirstOrDefault();
            if (konular == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Konu Bulunamadı";
                return sonuc;
            }
            else
            {
                konular.KonuAdi = konu.KonuAdi;
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Düzenleme Başarılı";
                return sonuc;
            }
        }

        [HttpDelete]
        [Route("api/konu/delete/{konuAdi}")]
        public SonucVM KonuDelete(string konuAdi)
        {
            Konular konular = database.Konulars.Where(s => s.KonuAdi == konuAdi).FirstOrDefault();
            if (konular == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Konu Bulunamadı";
                return sonuc;
            }
            else
            {
                database.Konulars.Remove(konular);
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Konu Silindir";
                return sonuc;
            }
        }




        [HttpGet]
        [Route("api/kullanici/list")]
        public List<UyeModel> KullaniciList()
        {
            List<UyeModel> kullaniciList = database.Uyes.Select(s => new UyeModel()
            {
                KullaniciAdi = s.KullaniciAdi,
                uyeId = s.uyeId,
                AdSoyad = s.AdSoyad,
                Email = s.Email,
                Sifre = s.Sifre,
                UyeAdmin = s.UyeAdmin,

            }).ToList();
            return kullaniciList;
        }


        [HttpGet]
        [Route("api/kullanici/list/{kullaniciAdi}")]
        public UyeModel KullaniciListKullaniciAdi(string kullaniciAdi)
        {
            UyeModel kullaniciList = database.Uyes.Where(x => x.KullaniciAdi == kullaniciAdi).Select(s => new UyeModel()
            {
                KullaniciAdi = s.KullaniciAdi,
                uyeId = s.uyeId,
                AdSoyad = s.AdSoyad,
                Email = s.Email,
                Sifre = s.Sifre,
                UyeAdmin = s.UyeAdmin,
            }).FirstOrDefault();
            return kullaniciList;
        }


        [HttpPost]
        [Route("api/kullanici/add")]
        public SonucVM KullaniciAdd(UyeModel kullanici)
        {
            if (database.Uyes.Where(s => s.KullaniciAdi == kullanici.KullaniciAdi).Count() > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı adı kullanılmaktadır";
                return sonuc;
            }
            Uye newkullanici = new Uye();
            newkullanici.KullaniciAdi = kullanici.KullaniciAdi;
            newkullanici.AdSoyad = kullanici.AdSoyad;
            newkullanici.Email = kullanici.Email;
            newkullanici.Sifre = kullanici.Sifre;
            newkullanici.UyeAdmin = 0;
            database.Uyes.Add(newkullanici);
            database.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Başarıyla Kayıt Oldunuz Giriş Ekranına Yönlendiriliyorsunuz";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kullanici/update")]
        public SonucVM KullaniciUpdate(UyeModel kullanici)
        {
            Uye kullanicilist = database.Uyes.Where(s => s.uyeId == kullanici.uyeId).FirstOrDefault();
            if (kullanicilist == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Bulunamadı";
                return sonuc;
            }
            else
            {
                kullanicilist.KullaniciAdi = kullanici.KullaniciAdi;
                kullanicilist.AdSoyad = kullanici.AdSoyad;
                kullanicilist.Email = kullanici.Email;
                kullanicilist.Sifre = kullanici.Sifre;
                kullanici.UyeAdmin = kullanici.UyeAdmin;
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Düzenleme Başarılı";
                return sonuc;
            }
        }

        [HttpDelete]
        [Route("api/kullanici/delete/{kullaniciAdi}")]
        public SonucVM KullaniciDelete(string kullaniciAdi)
        {
            Uye kullanicilar = database.Uyes.Where(s => s.KullaniciAdi == kullaniciAdi).FirstOrDefault();
            if (kullanicilar == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "kullanici Bulunamadı";
                return sonuc;
            }
            else
            {
                database.Uyes.Remove(kullanicilar);
                database.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Kullanıcı başarıyla silindi";
                return sonuc;
            }
        }

        [HttpGet]
        [Route("api/ikinciAnket/{uyeId}/{anketId}")]
        public SonucVM ikinciAnket(int uyeId, int anketId)
        {
            SecilenCevaplar seccevap = database.SecilenCevaplars.Where(s => s.SecCevUyeId == uyeId && s.SecCevAnketId == anketId).FirstOrDefault();
            if (seccevap != null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu anketi zaten çözdünüz lütfen başka anket çözünüz..";
                return sonuc;
            }
            else
            {
                sonuc.islem = true;
                sonuc.mesaj = "Çözebilirsin";
                return sonuc;
            }
        }















        [HttpPost]
        [Route("api/secilencevap/add")]
        public SonucVM SecilenCevapAdd(int[] cevapIdler)
        {
            int soruID;
            int anketID;
            for (int i = 0; i < cevapIdler.Length - 1; i++)
            {
                var a = cevapIdler[cevapIdler.Length - 1];
                var b = cevapIdler[i];
                AnketSecenekler soruBulma = database.AnketSeceneklers.Where(x => x.AnketSeceneklerId == b).FirstOrDefault();
                soruID = soruBulma.AnketSoruId;
                AnketSoru anketBulma = database.AnketSorus.Where(s => s.AnketSoruId == soruID).FirstOrDefault();
                anketID = anketBulma.AnketId;
                SecilenCevaplar secCevap = new SecilenCevaplar();
                secCevap.SecCevAnketId = anketID;
                secCevap.SecCevSoruId = soruID;
                secCevap.SecCevSecenekId = cevapIdler[i];
                secCevap.SecCevUyeId = a;
                database.SecilenCevaplars.Add(secCevap);
            }
            database.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kaydetme Başarılı";
            return sonuc;
        }


        [HttpGet]
        [Route("api/anketcozensayi/{anketId}")]
        public int CozenSayi(int anketId)
        {
            int sonuc;
            var a = database.SecilenCevaplars.Where(s => s.SecCevAnketId == anketId).Count();
            var b = database.AnketSorus.Where(s => s.AnketId == anketId).Count();
            if (a > 0 && b > 0)
            {
                sonuc = a / b;
            }
            else
            {
                sonuc = 0;
            }
            return sonuc;
        }



        [HttpGet]
        [Route("api/secilenseceneksayi/{soruId}")]
        public List<IstatistikSecenek> SecSecSayi(int soruId)
        {
            List<IstatistikSecenek> donus = new List<IstatistikSecenek>();
            List<AnketSecenekler> secenekler = database.AnketSeceneklers.Where(s => s.AnketSoruId == soruId).ToList();
            for (int i = 0; i < secenekler.Count; i++)
            {
                IstatistikSecenek seceneksIs = new IstatistikSecenek();
                var b = secenekler[i].AnketSeceneklerId;
                var c = secenekler[i].AnketSecenekYazi;
                var a = database.SecilenCevaplars.Where(s => s.SecCevSoruId == soruId && s.SecCevSecenekId == b).Count();
                seceneksIs.secenek = c.ToString();
                seceneksIs.secilmeSayisi = a;
                donus.Add(seceneksIs);
            }
            return donus;
        }
        public class IstatistikSecenek
        {
            public int secilmeSayisi { get; set; }
            public string secenek { get; set; }
        }

    }

}