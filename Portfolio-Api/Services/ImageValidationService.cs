using System.Drawing;
using System.Text.RegularExpressions;

namespace Portfolio_Api.Services
{
    public static class ImageValidationService
    {
        public static async Task<bool> IsImage(IFormFile postedFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                await postedFile.CopyToAsync(memoryStream);

                int ImageMinimumBytes = 512;

                //-------------------------------------------
                //  Check the image extension
                //-------------------------------------------
                var postedFileExtension = Path.GetExtension(postedFile.FileName);
                if (!string.Equals(postedFileExtension, ".jpg", StringComparison.OrdinalIgnoreCase)
                    && !string.Equals(postedFileExtension, ".png", StringComparison.OrdinalIgnoreCase)
                    && !string.Equals(postedFileExtension, ".gif", StringComparison.OrdinalIgnoreCase)
                    && !string.Equals(postedFileExtension, ".jpeg", StringComparison.OrdinalIgnoreCase))
                {
                    return false;
                }

                //-------------------------------------------
                //  Attempt to read the file and check the first bytes
                //-------------------------------------------
                try
                {
                    if (!memoryStream.CanRead)
                    {
                        return false;
                    }
                    //------------------------------------------
                    //   Check whether the image size exceeding the limit or not
                    //------------------------------------------ 
                    if (memoryStream.Length < ImageMinimumBytes)
                    {
                        return false;
                    }

                    byte[] buffer = new byte[ImageMinimumBytes];
                    memoryStream.Read(buffer, 0, ImageMinimumBytes);
                    string content = System.Text.Encoding.UTF8.GetString(buffer);
                    if (Regex.IsMatch(content, @"<script|<html|<head|<title|<body|<pre|<table|<a\s+href|<img|<plaintext|<cross\-domain\-policy",
                        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Multiline))
                    {
                        return false;
                    }
                }
                catch (Exception)
                {
                    return false;
                }

                //-------------------------------------------
                //  Try to instantiate new Bitmap, if .NET will throw exception
                //  we can assume that it's not a valid image
                //-------------------------------------------


                memoryStream.Position = 0;


                return true;
            }
        }
    }
}
