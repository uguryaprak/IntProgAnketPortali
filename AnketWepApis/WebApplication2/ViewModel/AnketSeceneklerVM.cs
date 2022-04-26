using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketWebApis.ViewModel
{
    public class AnketSeceneklerVM
    {
        public int AnketSeceneklerId { get; set; }
        public int AnketSoruId { get; set; }
        public string AnketSecenekYazi { get; set; }
        public AnketSoruVM anketsoruBilgi { get; set; }
    }
}