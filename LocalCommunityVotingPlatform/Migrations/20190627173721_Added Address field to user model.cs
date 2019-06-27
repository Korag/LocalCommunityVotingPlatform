using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalCommunityVotingPlatform.Migrations
{
    public partial class AddedAddressfieldtousermodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a5dc5b1-e65c-4b46-b3da-06d6220b7569");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "36f426c9-7c13-4e16-aaa7-65ba8193fa1c", "f2d7e7ea-d58c-426e-b83f-72e81561ff3e", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36f426c9-7c13-4e16-aaa7-65ba8193fa1c");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1a5dc5b1-e65c-4b46-b3da-06d6220b7569", "f9a977f2-c909-4548-8a77-db519bdd8cab", "Admin", "ADMIN" });
        }
    }
}
