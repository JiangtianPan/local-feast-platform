-- Create a storage bucket for restaurant maps
INSERT INTO storage.buckets (id, name, public) 
VALUES ('restaurant-maps', 'restaurant-maps', true);

-- Create policies for the restaurant maps bucket
CREATE POLICY "Allow public read access to restaurant maps" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'restaurant-maps');

CREATE POLICY "Allow public upload to restaurant maps" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'restaurant-maps');

CREATE POLICY "Allow public update to restaurant maps" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'restaurant-maps');

CREATE POLICY "Allow public delete from restaurant maps" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'restaurant-maps');