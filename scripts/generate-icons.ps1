# Reproducible raster icons from the existing Genio G/paper/Italian flag identity.
Add-Type -AssemblyName System.Drawing
$iconDirectory = Join-Path $PSScriptRoot '../public/assets'
foreach ($iconSpec in @(@('icon-192.png',192),@('icon-512.png',512),@('icon-maskable-512.png',512),@('apple-touch-icon.png',180))) {
  $iconSize = [int]$iconSpec[1]
  $iconBitmap = [Drawing.Bitmap]::new($iconSize,$iconSize)
  $iconGraphics = [Drawing.Graphics]::FromImage($iconBitmap)
  $iconGraphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $iconGraphics.TextRenderingHint = [Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $iconGraphics.Clear([Drawing.ColorTranslator]::FromHtml('#f7f0e2'))
  $rulePen = [Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml('#d4e1e6'),[single]($iconSize/512))
  for ($ruleIndex=0; $ruleIndex -lt 12; $ruleIndex++) {
    $ruleY = [single](($ruleIndex*40+18)*$iconSize/512)
    $iconGraphics.DrawLine($rulePen,0,$ruleY,$iconSize,$ruleY)
  }
  $inkBrush = [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#193a75'))
  $iconFont = [Drawing.Font]::new('Georgia',[single]($iconSize*.52),[Drawing.FontStyle]::Bold,[Drawing.GraphicsUnit]::Pixel)
  $textFormat = [Drawing.StringFormat]::new()
  $textFormat.Alignment = [Drawing.StringAlignment]::Center
  $textFormat.LineAlignment = [Drawing.StringAlignment]::Center
  $iconGraphics.DrawString('G',$iconFont,$inkBrush,[Drawing.RectangleF]::new(0,[single]($iconSize*.02),$iconSize,[single]($iconSize*.88)),$textFormat)
  $redPen = [Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml('#b6382f'),[single]($iconSize*.012))
  $iconGraphics.DrawLine($redPen,[single]($iconSize*.31),[single]($iconSize*.77),[single]($iconSize*.69),[single]($iconSize*.74))
  $flagColors = @('#2b876d','#fffdf5','#b6382f')
  for($flagIndex=0;$flagIndex -lt 3;$flagIndex++){
    $flagBrush = [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml($flagColors[$flagIndex]))
    $iconGraphics.FillRectangle($flagBrush,[single]($iconSize*(.402+$flagIndex*.065)),[single]($iconSize*.18),[single]($iconSize*.055),[single]($iconSize*.035))
    $flagBrush.Dispose()
  }
  $iconBitmap.Save((Join-Path $iconDirectory $iconSpec[0]),[Drawing.Imaging.ImageFormat]::Png)
  $textFormat.Dispose(); $iconFont.Dispose(); $inkBrush.Dispose(); $redPen.Dispose(); $rulePen.Dispose(); $iconGraphics.Dispose(); $iconBitmap.Dispose()
}
