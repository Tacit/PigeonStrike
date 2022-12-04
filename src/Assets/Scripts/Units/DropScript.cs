using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DropScript : MonoBehaviour {

    // Use this for initialization
    public Transform paperPrefab;
    public Transform doughnutPrefab;
    SpriteRenderer render;
    float cooldDown = 4;
    float cd;
	void Start () {
        render = gameObject.GetComponent<SpriteRenderer>();
        cd = cooldDown;
    }
	
	// Update is called once per frame
	void Update () {
        cd -= Time.deltaTime;

        if (render.isVisible && cd < 0)
        {
            cd = cooldDown;
            bool spawn = Random.value < 0.5;
            if(spawn)
            {
                int type = Random.Range(0, 2);
                Transform item = null;
                switch(type)
                {
                    case 0:
                        item = Instantiate(paperPrefab);
                        break;
                    case 1:
                        item = Instantiate(doughnutPrefab);
                        break;
                }

                item.position = new Vector3(gameObject.GetComponent<Transform>().position.x, 
                    gameObject.GetComponent<Transform>().position.y - Random.Range(0.5f, 1f));
            }
        }
	}
}
