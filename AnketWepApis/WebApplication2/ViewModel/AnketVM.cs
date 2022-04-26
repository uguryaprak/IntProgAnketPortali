using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketWebApis.ViewModel
{
    public class AnketVM
    {
        public int AnketId { get; set; }
        public int KonuId { get; set; }
        public string AnketAciklama { get; set; }
        public int OlusturanKullanici { get; set; }
        public KonularVM konuBilgi { get; set; }
        public UyeModel kullaniciBilgi { get; set; }
    }
}