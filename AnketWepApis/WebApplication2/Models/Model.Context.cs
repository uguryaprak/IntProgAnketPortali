//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication2.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AnketDBEntities : DbContext
    {
        public AnketDBEntities()
            : base("name=AnketDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Anket> Ankets { get; set; }
        public virtual DbSet<AnketSecenekler> AnketSeceneklers { get; set; }
        public virtual DbSet<AnketSoru> AnketSorus { get; set; }
        public virtual DbSet<Konular> Konulars { get; set; }
        public virtual DbSet<SecilenCevaplar> SecilenCevaplars { get; set; }
        public virtual DbSet<Uye> Uyes { get; set; }
    }
}
