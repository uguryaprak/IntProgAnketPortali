using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketWebApis.ViewModel
{
    public class AnketSoruVM
    {
        public int AnketSoruId { get; set; }
        public int AnketId { get; set; }
        public string Soru { get; set; }

        public AnketVM anketBilgi { get; set; }
        public List<AnketSeceneklerVM> anketsorus { get; set; }
    }
}