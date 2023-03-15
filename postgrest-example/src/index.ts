/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}
import { PostgrestClient } from '@supabase/postgrest-js'
const client = new PostgrestClient("https://petition-starter-revelation-subdivision.trycloudflare.com")
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
			const { data, error } = await client
			  .from('users')
			  .select()
		  
			if (error) throw error
		  
			return new Response(JSON.stringify(data), {
			  headers: {
				'Content-type': 'application/json'
			  }
			})
	},
};



// // ... Rest of code
// addEventListener('fetch', event => {
// 	async function handleRequest(request:any) {
// 		const { data, error } = await client
// 		  .from('users')
// 		  .select()
	  
// 		if (error) throw error
	  
// 		return new Response(JSON.stringify(data), {
// 		  headers: {
// 			'Content-type': 'application/json'
// 		  }
// 		})
// 	  }
// })
