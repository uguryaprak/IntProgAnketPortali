using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketWebApis.ViewModel
{
    public class SecilenCevaplarVM
    {
        public int SecCevId { get; set; }
        public int SecCevAnketId { get; set; }
        public int SecCevSoruId { get; set; }
        public int SecCevSecenekId { get; set; }
        public int SecCevUyeId { get; set; }
        public AnketVM anketBilgi { get; set; }
        public AnketSoruVM anketSoruBilgi { get; set; }
        public AnketSeceneklerVM anketsecBilgi { get; set; }
    }
}